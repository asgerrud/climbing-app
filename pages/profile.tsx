import { Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import React from 'react'
import prisma from '../lib/prisma.ts'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

const Profile = (props) => {

  console.log(props.feed)

  return (
    <Box>profile</Box>
  )
}

export default Profile