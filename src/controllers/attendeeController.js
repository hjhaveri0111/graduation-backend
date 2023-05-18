import Attendee from '../models/attendeeModel';

export const addAttendee = async (body) => {
  const { name, family } = body;
  console.log('here');
  try {
    const newAttendee = await Attendee.create({
      name,
      family,
    });

    return newAttendee;
  } catch (error) {
    throw new Error('Error creating attendee:', error);
  }
};
// Get all attendees
export const getAllAttendees = async () => {
  try {
    const attendees = await Attendee.find();
    return attendees;
  } catch (error) {
    throw new Error('Failed to get attendees');
  }
};

// Change the attending status of an attendee
export const changeAttendingStatus = async (id, attending) => {
  try {
    const attendee = await Attendee.findById(id);
    if (!attendee) {
      throw new Error('Attendee not found');
    }

    attendee.attending = attending;
    await attendee.save();

    return attendee;
  } catch (error) {
    throw new Error('Failed to change attending status');
  }
};

export const searchForAttendee = async (name) => {
  try {
    console.log(name);
    const attendees = await Attendee.find({ $name: { $search: name } });
    return attendees;
  } catch (error) {
    throw new Error('Error searching attendees:', error);
  }
};

export const deleteAttendee = async (id) => {
  try {
    const deletedAttendee = await Attendee.findByIdAndDelete(id);

    if (!deletedAttendee) {
      throw new Error({ error: 'Attendee not found' });
    }

    return deletedAttendee;
  } catch (error) {
    throw new Error({ error: 'An error occurred while deleting the attendee' });
  }
};

export const editAttendeeName = async (id, name) => {
  const attendee = await Attendee.findByIdAndUpdate(id, { name }, { new: true });
  return attendee;
};

export const deleteAll = async () => {
  try {
    const deleted = await Attendee.deleteMany();
    return deleted;
  } catch (error) {
    throw new Error({ error: 'An error occurred while deleting the attendees' });
  }
};
