const moment = require('moment');

module.exports.formatDate = ({ date, month, year }) => moment()
  .year(year)
  .month(month)
  .date(date)
  .startOf('day')
  .toISOString();

module.exports.formatTimeOfDay = ({ hour, minute }) => moment()
  .hour(hour)
  .minute(minute)
  .format('HH:mm');