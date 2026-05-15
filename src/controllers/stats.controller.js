const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const Studio = require('../models/studio.model')
const Team = require('../models/team.model')
const Contact = require('../models/contact.model')
const InstantBooking = require('../models/instantBooking.model')
const PageView = require('../models/pageview.model')

const calcTrend = (current, previous) => {
  if (!previous) return '+0.0%'
  const diff = ((current - previous) / previous) * 100
  return `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%`
}

const getDashboardStats = asyncHandler(async (req, res) => {
  const now = Date.now()
  const weekAgo       = new Date(now - 7  * 24 * 60 * 60 * 1000)
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)
  const sixtyDaysAgo  = new Date(now - 60 * 24 * 60 * 60 * 1000)
  const fiveMinAgo    = new Date(now - 5  * 60 * 1000)

  const [
    totalStudios,
    totalTeam,
    totalInquiries,
    newInquiriesThisWeek,
    totalInstantBookings,
    newInstantBookingsThisWeek,
    totalHits,
    liveSessionIds,
    // current 30 days
    hitsThisPeriod,
    avgSessionCurrent,
    // previous 30 days (30–60 days ago)
    hitsPrevPeriod,
    avgSessionPrev,
    // traffic chart
    trafficTrend,
  ] = await Promise.all([
    Studio.countDocuments({ isActive: true }),
    Team.countDocuments({ isActive: true }),
    Contact.countDocuments(),
    Contact.countDocuments({ createdAt: { $gte: weekAgo } }),
    InstantBooking.countDocuments(),
    InstantBooking.countDocuments({ createdAt: { $gte: weekAgo } }),
    PageView.countDocuments(),
    PageView.distinct('sessionId', { createdAt: { $gte: fiveMinAgo } }),

    // hits: last 30 days
    PageView.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),

    // avg session: last 30 days
    PageView.aggregate([
      { $match: { duration: { $gt: 0 }, createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: null, avg: { $avg: '$duration' } } },
    ]),

    // hits: previous 30 days (30–60 days ago)
    PageView.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),

    // avg session: previous 30 days
    PageView.aggregate([
      { $match: { duration: { $gt: 0 }, createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } } },
      { $group: { _id: null, avg: { $avg: '$duration' } } },
    ]),

    // traffic chart: last 30 days grouped by day
    PageView.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%m-%d', date: '$createdAt' } },
          hits: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ])

  const currentAvgSec = Math.round(avgSessionCurrent[0]?.avg || 0)
  const prevAvgSec    = Math.round(avgSessionPrev[0]?.avg    || 0)

  const avgSession = `${Math.floor(currentAvgSec / 60)}m ${currentAvgSec % 60}s`
  const hitsTrend    = calcTrend(hitsThisPeriod, hitsPrevPeriod)
  const sessionTrend = calcTrend(currentAvgSec,  prevAvgSec)

  res.json(
    new ApiResponse(200, {
      totalStudios,
      totalTeam,
      totalInquiries,
      newInquiriesThisWeek,
      totalInstantBookings,
      newInstantBookingsThisWeek,
      totalHits,
      liveVisitors: liveSessionIds.length,
      avgSession,
      hitsTrend,
      sessionTrend,
      trafficTrend,  // [{ _id: "05-01", hits: 520 }, ...]
    })
  )
})

module.exports = { getDashboardStats }
