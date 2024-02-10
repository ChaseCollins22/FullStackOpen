import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientsService.addPatient(req.body);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;