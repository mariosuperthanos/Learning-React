import { Fragment } from "react";
import MeetupDatials from "../../components/meetups/MeetupDetail";
import { title } from "process";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDatialsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      {props?.message === 'ERROR' ? <p>error</p> : (
        <MeetupDatials
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
      )}
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://david1bargianu:IZSNk4qSavwqaCKE@cluster0.a6hho.mongodb.net/meetups?retryWrites=true&w=majority');
  
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups =  await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// Here it's will be an error, becuase Next.js doesn't know what
// pages with that meetupID should be pre-generated
export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://david1bargianu:IZSNk4qSavwqaCKE@cluster0.a6hho.mongodb.net/meetups?retryWrites=true&w=majority');
  
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup =  await meetupsCollection.findOne({ _id: new ObjectId(meetupId) })

  client.close();

  if (!selectedMeetup) {
    // Dacă `selectedMeetup` este `null` sau `undefined`, întoarce o eroare.
    return {
      props: {
        message: 'ERROR',
      },
    };
  }
  
  // Asigură-te că `selectedMeetup.data` există și conține proprietățile necesare.
  if (
    !selectedMeetup.data ||
    !selectedMeetup.data.title ||
    !selectedMeetup.data.address ||
    !selectedMeetup.data.image ||
    !selectedMeetup.data.description
  ) {
    return {
      props: {
        message: 'ERROR',
      },
    };
  }

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        image: selectedMeetup.data.image,
        description: selectedMeetup.data.description
      },
    },
  };
}

export default MeetupDatialsPage;
