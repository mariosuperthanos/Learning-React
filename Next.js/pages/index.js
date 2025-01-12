// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    image:
      "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "First Meetup",
    address: "123 Main Street, Cityville",
  },
  {
    id: "m2",
    image:
      "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=5000",
    title: "Second Meetup",
    address: "456 Elm Street, Townsville",
  },
  {
    id: "m3",
    image:
      "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Third Meetup",
    address: "789 Oak Avenue, Villagetown",
  },
];

const HomePage = (props) => {
  console.log(props.meetups);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const { req, res } = context;

//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//   }
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://david1bargianu:IZSNk4qSavwqaCKE@cluster0.a6hho.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
