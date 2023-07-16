module.exports = {
  fetchData: (req, res) => {
    console.log(req.body);
    res.status(200).send({
      success: true,
      message: 'Fetch data success',
      data: {}
    });
  }
}