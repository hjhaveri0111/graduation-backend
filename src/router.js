import { Router } from 'express';
import {
  getAllAttendees, searchForAttendee, changeAttendingStatus, addAttendee, deleteAttendee, deleteAll, editAttendeeName,
} from './controllers/attendeeController';

const router = Router();

router.get('/attendees', async (req, res) => {
  try {
    const attendees = await getAllAttendees();
    return res.json(attendees);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post('/attendees', async (req, res) => {
  try {
    const rooms = req.body;
    console.log(rooms);
    const attendee = await addAttendee(req.body);
    return res.json(attendee);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get('/attendees/search', async (req, res) => {
  const { name } = req.query;

  try {
    const attendees = await searchForAttendee(name);
    return res.json(attendees);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

router.put('/attendees/:attendeeId', async (req, res) => {
  const { attendeeId } = req.params;
  const { attending } = req.body;
  try {
    const attendee = await changeAttendingStatus(attendeeId, attending);
    return res.json(attendee);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete('/attendees/:attendeeId', async (req, res) => {
  const { attendeeId } = req.params;

  try {
    const deletedAttendee = await deleteAttendee(attendeeId);
    return res.json(deletedAttendee);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.patch('/attendees/:attendeeId', async (req, res) => {
  const { name } = req.body;
  const { attendeeId } = req.params;
  const attendee = await editAttendeeName(attendeeId, name);
  return res.json(attendee);
});

router.delete('/all', async (req, res) => {
  try {
    console.log('here');
    const deleted = await deleteAll();
    return res.json(deleted);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
