import pkg from 'agora-access-token';
const { RtcRole, RtcTokenBuilder } = pkg;
import { io } from '../../index.js'; // Import the io instance

export const getAccessToken = async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  
  const currentTime = Math.floor(Date.now() / 1000); // Corrected the function call
  const privilegeExpireTime = currentTime + parseInt(process.env.AGORA_TOKENEXPIRES_IN, 10); // Parse the env variable

  const token = RtcTokenBuilder.buildTokenWithUid(
    process.env.APP_ID,
    process.env.APP_CERTIFICATE,
    process.env.CHANNEL_NAME,
    parseInt(process.env.UID, 10), // Convert UID to a number if it's not
    RtcRole.PUBLISHER,
    privilegeExpireTime
  );

  // Emit the token to the admin dashboard
  io.emit('tokenGenerated', {
    channelName: process.env.CHANNEL_NAME,
    uid: parseInt(process.env.UID, 10),
    token
  });

  res.status(200).json({ agoraToken: token });
};
