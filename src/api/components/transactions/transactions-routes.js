module.exports = (app) => {
  // ❗ samakan dengan menus.js (jangan diubah file aslinya)
  let menus = [
    { id: 1, name: "Nasi Goreng" },
    { id: 2, name: "Mie Ayam" }
  ];

  let transactions = [];
  let userStamps = {};

  // 🔥 POST /api/transactions
  app.post('/transactions', (req, res) => {
    const { userId, menuId } = req.body;

    // validasi input
    if (!userId || !menuId) {
      return res.status(400).json({
        message: "userId dan menuId wajib diisi"
      });
    }

    // cari menu berdasarkan id
    const menu = menus.find(m => m.id === menuId);

    if (!menu) {
      return res.status(404).json({
        message: "Menu tidak ditemukan"
      });
    }

    // tambah stamp
    if (!userStamps[userId]) {
      userStamps[userId] = 0;
    }

    userStamps[userId] += 1;

    const newTransaction = {
      id: transactions.length + 1,
      userId,
      menuId,
      menuName: menu.name, // ✅ ambil dari menus
      stampAfter: userStamps[userId],
      date: new Date()
    };

    transactions.push(newTransaction);

    res.json({
      message: "Transaksi berhasil + stamp bertambah",
      data: newTransaction
    });
  });

  // 🔥 GET /api/transactions/:userId
  app.get('/transactions/:userId', (req, res) => {
    const { userId } = req.params;

    const result = transactions.filter(t => t.userId === userId);

    res.json({
      message: "Riwayat transaksi",
      totalStamp: userStamps[userId] || 0,
      data: result
    });
  });
};