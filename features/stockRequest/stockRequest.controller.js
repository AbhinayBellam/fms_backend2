const stockRequestService = require('./stockRequest.service');

exports.createStockRequest = async (req, res) => {
  const stockRequest = await stockRequestService.createStockRequest(req.body);
  res.status(201).json(stockRequest);
};

exports.getAllStockRequests = async (req, res) => {
  const requests = await stockRequestService.getAllStockRequests();
  res.json(requests);
};

exports.getStockRequestById = async (req, res) => {
  const request = await stockRequestService.getStockRequestById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Stock request not found' });
  res.json(request);
};

exports.getStockRequestsByFranchise = async (req, res) => {
  const requests = await stockRequestService.getStockRequestsByFranchise(req.params.franchiseId);
  res.json(requests);
};

exports.updateStockRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const updated = await stockRequestService.updateStockRequestStatus(id, status);
  res.json({ message: `Stock request ${status}`, updated });
};

exports.deleteStockRequest = async (req, res) => {
  await stockRequestService.deleteStockRequest(req.params.id);
  res.json({ message: 'Stock request deleted successfully' });
};
