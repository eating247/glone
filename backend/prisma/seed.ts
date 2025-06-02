import { PrismaClient, Priority } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const emails = [
    {
      from: 'john.doe@company.com',
      to: 'user@gmail.com',
      subject: 'Weekly Team Standup',
      body: 'Hi team, please join us for our weekly standup meeting tomorrow at 10 AM. We\'ll be discussing project progress and upcoming deadlines.',
      isRead: false,
      isStarred: true,
      priority: Priority.HIGH,
      createdAt: new Date('2024-01-15T09:30:00Z'),
    },
    {
      from: 'support@service.com',
      to: 'user@gmail.com',
      subject: 'Your subscription is expiring soon',
      body: 'Your premium subscription will expire in 3 days. Renew now to continue enjoying all premium features.',
      isRead: true,
      isStarred: false,
      priority: Priority.NORMAL,
      createdAt: new Date('2024-01-14T14:22:00Z'),
      deletedAt: new Date('2024-01-15T10:19:00Z'),
    },
    {
      from: 'newsletter@techblog.com',
      to: 'user@gmail.com',
      subject: 'Top 10 JavaScript Frameworks in 2024',
      body: 'Discover the most popular JavaScript frameworks that are shaping web development this year. From React to Vue.js, we cover them all.',
      isRead: false,
      isStarred: false,
      priority: Priority.LOW,
      createdAt: new Date('2024-01-13T08:15:00Z'),
    },
    {
      from: 'hr@mycompany.com',
      to: 'user@gmail.com',
      subject: 'URGENT: Update your emergency contact information',
      body: 'Please update your emergency contact information in the HR portal by end of week. This is required for all employees.',
      isRead: false,
      isStarred: true,
      priority: Priority.URGENT,
      createdAt: new Date('2024-01-12T16:45:00Z'),
    },
    {
      from: 'noreply@bank.com',
      to: 'user@gmail.com',
      subject: 'Monthly Statement Available',
      body: 'Your monthly bank statement for December 2023 is now available for download in your online banking portal.',
      isRead: true,
      isStarred: false,
      priority: Priority.NORMAL,
      createdAt: new Date('2024-01-11T10:00:00Z'),
    },
    {
      from: 'events@conference.com',
      to: 'user@gmail.com',
      subject: 'Reminder: Tech Conference Tomorrow',
      body: 'Don\'t forget about the developer conference tomorrow. Your ticket and schedule are attached. Looking forward to seeing you there!',
      isRead: false,
      isStarred: true,
      priority: Priority.HIGH,
      createdAt: new Date('2024-01-10T19:30:00Z'),
    },
    {
      from: 'social@platform.com',
      to: 'user@gmail.com',
      subject: 'You have 5 new notifications',
      body: 'Check out what\'s happening on your social network. You have new likes, comments, and friend requests waiting for you.',
      isRead: true,
      isStarred: false,
      priority: Priority.LOW,
      createdAt: new Date('2024-01-09T12:20:00Z'),
    },
    {
      from: 'delivery@shipping.com',
      to: 'user@gmail.com',
      subject: 'Package delivered successfully',
      body: 'Your package #ABC123 has been delivered to your address. Thank you for choosing our shipping service.',
      isRead: true,
      isStarred: false,
      priority: Priority.NORMAL,
      createdAt: new Date('2024-01-08T15:10:00Z'),
    },
    {
      from: 'security@email.com',
      to: 'user@gmail.com',
      subject: 'New login detected from unknown device',
      body: 'We detected a login to your account from a new device. If this wasn\'t you, please change your password immediately.',
      isRead: false,
      isStarred: true,
      priority: Priority.URGENT,
      createdAt: new Date('2024-01-07T20:05:00Z'),
    },
    {
      from: 'admin@project.com',
      to: 'user@gmail.com',
      subject: 'Project milestone completed',
      body: 'Congratulations! The development team has successfully completed the Q4 milestone. Great work everyone!',
      isRead: true,
      isStarred: true,
      priority: Priority.NORMAL,
      createdAt: new Date('2024-01-06T11:40:00Z'),
    },
    {
      from: 'marketing@store.com',
      to: 'user@gmail.com',
      subject: '50% OFF Sale - Limited Time Only!',
      body: 'Don\'t miss out on our biggest sale of the year! Get 50% off on all items. Sale ends this weekend.',
      isRead: false,
      isStarred: false,
      priority: Priority.LOW,
      createdAt: new Date('2024-01-05T07:25:00Z'),
    },
    {
      from: 'calendar@app.com',
      to: 'user@gmail.com',
      subject: 'Meeting reminder: Client call in 1 hour',
      body: 'This is a reminder that you have a client call scheduled in 1 hour. The meeting link and agenda are included.',
      isRead: false,
      isStarred: true,
      priority: Priority.HIGH,
      createdAt: new Date('2024-01-04T13:55:00Z'),
    },
  ];

  console.log('Seeding database...');
  
  for (const email of emails) {
    await prisma.email.create({
      data: email,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
