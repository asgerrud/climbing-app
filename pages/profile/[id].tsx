import { Container, Grid } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Card from '../../components/generic/card/Card'
import Bio from '../../components/profile/Bio'
import { ClimbingAppUser } from '../../types/next-auth'
import prisma from '../../utils/prisma'

type ProfilePageProps = {
  user: ClimbingAppUser
  friends: any // temporary solution
}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {

  const { name, image } = props.user
  console.log(props)

  const profile = {
    name: name,
    username: '<username>',
    avatarImg: image,
    height: 183,
    armspan: 183,
    apeIndex: 1.00,
    memberships: ['Boulders', 'Betaboulders', 'Blocs & Walls'],
    friends: props.friends
  }


  return (
    <Container maxW="120ch" py={4}>
      <Card>
        <Grid templateColumns={{ base: '1fr', md: '2fr 5fr' }} gap={4}>
          <Bio profile={profile}/>
        </Grid>
      </Card>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { 
      id: String(params?.id) 
    },
    select: {
      name: true,
      image: true
    }
  })

  const friends = await prisma.user.findMany({
    where: {
      NOT: {
        id: String(params?.id) 
      }
    },
    select: {
      id: true,
      name: true,
      image: true
    }
  })

  return { props: { 
    user: JSON.parse(JSON.stringify(user)), 
    friends: JSON.parse(JSON.stringify(friends)) // temporary solution
  } }
}

export default ProfilePage