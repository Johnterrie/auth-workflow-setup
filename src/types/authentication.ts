interface Payload {
  user: {
    userId: string;
    role: string;
    // Add other user properties if needed
  };
  refreshToken: string;
  payload: string;
}

export default Payload;
