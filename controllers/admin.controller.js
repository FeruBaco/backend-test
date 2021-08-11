const { Parser } = require('json2csv')
const Trade = require('../models/Trade')

module.exports = {
  // Retrieve trade report
  tradeReport: async function (req, res) {
    const { initialDate, finalDate, parkingId } = req.body

    /**
     * If parking ID exist retrieve trades between date from specific parking
     */
    let trades = ''
    if (parkingId) {
      trades = await Trade.find({
        parking: parkingId,
        createdAt: {
          $gte: initialDate,
          $lt: finalDate
        }
      })
    } else {
      trades = await Trade.find({
        createdAt: {
          $gte: initialDate,
          $lt: finalDate
        }
      })
    }
    const fields = [
      {
        label: 'Id',
        value: '_id'
      },
      {
        label: 'Total',
        value: 'total'
      },
      {
        label: 'Ticket',
        value: 'ticket'
      },
      {
        label: 'User_Id',
        value: 'user'
      },
      {
        label: 'Parking_Id',
        value: 'parking'
      },
      {
        label: 'Created_At',
        value: 'createdAt'
      }
    ]
    const json2csv = new Parser({ fields })
    const csv = json2csv.parse(trades)
    res.header('Content-Type', 'text/csv')
    res.attachment('trades.csv')
    return res.send(csv)
  },
  // Retrieve trade report test
  tradeReportTest: async function (req, res) {
    const initialDate = '2021,8,10'
    const finalDate = '2021,8,12'

    const trades = await Trade.find({
      createdAt: {
        $gte: initialDate,
        $lt: finalDate
      }
    })
    const fields = [
      {
        label: 'Id',
        value: '_id'
      },
      {
        label: 'Total',
        value: 'total'
      },
      {
        label: 'Ticket',
        value: 'ticket'
      },
      {
        label: 'User_Id',
        value: 'user'
      },
      {
        label: 'Parking_Id',
        value: 'parking'
      },
      {
        label: 'Created_At',
        value: 'createdAt'
      }
    ]
    const json2csv = new Parser({ fields })
    const csv = json2csv.parse(trades)
    res.header('Content-Type', 'text/csv')
    res.attachment('trades.csv')
    return res.send(csv)
  }
}
