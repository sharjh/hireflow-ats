const createCompany = async (req, res) => {
    const { name, description } = req.body;
    const ownerId = req.user.id;
};

module.exports = createCompany;