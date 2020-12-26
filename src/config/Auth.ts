export default {
  jwt: {
    secret: process.env.APP_SECRET || 'secret_default_go_barber',
    expiresIn: '1d',
  },
};
