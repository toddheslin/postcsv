module.exports = res => res.map(r => ({ status: r.status, data: r.config.data }))
