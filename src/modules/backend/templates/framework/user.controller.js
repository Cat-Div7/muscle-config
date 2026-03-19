export const getUsers = async (req, res) => {
  res.json({ status: 'success', data: [{ id: 1, name: 'Muscle User' }] });
};