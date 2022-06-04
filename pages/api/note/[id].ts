import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const noteId  = req.query.id
  
  if (req.method == 'DELETE') {
    const note = await prisma.note.delete({
      where: { id: noteId },
    })
    res.json(note)
  } else if (req.method == 'PUT') {

    const { title, content, updatedAt } = JSON.parse(req.body)

    const note = await prisma.note.update({
      where: { id: noteId },
      data: { 
        title: title,
        content: content,
        updated_at: updatedAt
      },
    })
    res.json(note)

  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    )
  }
}