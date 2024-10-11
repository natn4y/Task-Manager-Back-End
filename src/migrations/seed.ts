import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.create({
    data: {
      username: 'Diego',
      email: 'diego@example.com',
      password: await bcrypt.hash('password1', 10),
      tasks: {
        create: [
          {
            title: 'Finish project report',
            description:
              'Complete the final report for the project by Friday.',
            status: 'Pending',
          },
          {
            title: 'Review code changes',
            description:
              'Review the latest pull requests and provide feedback.',
            status: 'In Progress',
          },
          {
            title: 'Prepare presentation slides',
            description:
              'Create slides for the upcoming team presentation next week.',
            status: 'Pending',
          },
          {
            title: 'Attend team meeting',
            description:
              'Participate in the weekly team meeting to discuss project updates.',
            status: 'Completed',
          },
          {
            title: 'Fix bugs in application',
            description:
              'Resolve the bugs reported in the last testing phase.',
            status: 'In Progress',
          },
          {
            title: 'Conduct user testing',
            description:
              'Set up and conduct user testing sessions for the new feature.',
            status: 'Pending',
          },
          {
            title: 'Update project documentation',
            description:
              'Revise the project documentation to reflect recent changes.',
            status: 'Pending',
          },
        ],
      },
    },
  })

  console.log({ user1 })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
