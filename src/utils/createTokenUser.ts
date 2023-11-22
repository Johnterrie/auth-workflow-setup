const createTokenUser = (user: { name: string; _id: string; role: string }) => {
  return { name: user.name, userId: user._id, role: user.role };
};

export default createTokenUser;
