import PDFDocument from 'pdfkit';
import Bill from '../models/Bill.js';
import Receipt from '../models/Receipt.js';

export const createBill = async (req, res) => {
  const { consultationFee = 0, labTestCharges = 0, medicineCharges = 0, otherServices = 0, patient } = req.body;
  const totalAmount = Number(consultationFee) + Number(labTestCharges) + Number(medicineCharges) + Number(otherServices);
  const bill = await Bill.create({ patient, consultationFee, labTestCharges, medicineCharges, otherServices, totalAmount });
  return res.status(201).json(bill);
};

export const generateReceipt = async (req, res) => {
  const { patient, services, totalAmount, paymentStatus } = req.body;
  const receipt = await Receipt.create({
    receiptNumber: `RCPT-${Date.now()}`,
    patient,
    services,
    totalAmount,
    paymentStatus
  });
  return res.status(201).json(receipt);
};

export const downloadReceiptPdf = async (req, res) => {
  const receipt = await Receipt.findById(req.params.id).populate('patient');
  if (!receipt) return res.status(404).json({ message: 'Receipt not found' });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=receipt-${receipt.receiptNumber}.pdf`);

  doc.fontSize(20).text('Smart Hospital Receipt');
  doc.moveDown();
  doc.fontSize(12).text(`Receipt No: ${receipt.receiptNumber}`);
  doc.text(`Patient: ${receipt.patient.name}`);
  doc.text(`Total: ${receipt.totalAmount}`);
  doc.text(`Status: ${receipt.paymentStatus}`);
  doc.text(`Date: ${new Date(receipt.paymentDate).toLocaleString()}`);
  doc.text(`Services: ${receipt.services.join(', ')}`);

  doc.pipe(res);
  doc.end();
};
