import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  if (req.method == 'POST') {
    const { name, lat, lon, type, facilities } = req.body
    const result = await prisma.location.create({
      data: {
        name: name,
        lat: lat,
        lon: lon,
        type: {
          create: [{ 
            name: type
          }]
        },
        facilities: {
          create: facilities.map(facility => {
            return { name: facility }
          })
        }
      },
    })
    res.json(result)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    )
  }
}