// our-doamin.com/new-meetup
// @ts-nocheck

import { useMutation } from '@tanstack/react-query';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { getData } from '../../API funcs/getData';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';


const NewMeetupPage = () => {
  const router = useRouter();

  const onAddMeetupHandler = (enteredMeetupData) => {
    console.log(enteredMeetupData);
    firstMutation.mutate(enteredMeetupData)
  }

  const firstMutation = useMutation({
    mutationKey: ['getData'],
    mutationFn: getData,
    onSuccess(data) {
      console.log(data);
      router.push('/');
    }
  })

  return(
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your own meetup!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler}/> 
    </Fragment>
  )
}

export default NewMeetupPage;