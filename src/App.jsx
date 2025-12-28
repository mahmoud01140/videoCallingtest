import { CallingState, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks, StreamTheme, ParticipantView } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';


// set up the user object
const user = {
  id: userId,
  name: 'mahmoud',
  image: 'https://getstream.io/random_svg/?id=mahmoud&name=mahmoud',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const call = useCall(callId);

  const { useCallCallingState, useParticipantCount, useRemoteParticipants, useLocalParticipant, } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const remoteParticipants = useRemoteParticipants();
  const localParticipant = useLocalParticipant();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <MyParticipantList participants={remoteParticipants} />
      <MyFloatingLocalParticipant participant={localParticipant} />
    </StreamTheme>
  );
};


export const MyParticipantList = ({ participants }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {participants.map((participant) => (
        <ParticipantView participant={participant} key={participant.sessionId} />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = ({ participant }) => {
  if (!participant) {
    return <p>Error: No local participant</p>;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};