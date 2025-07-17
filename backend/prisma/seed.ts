import { PrismaClient, Priority } from '@prisma/client';

const prisma = new PrismaClient();

const sampleSubjects = [
  'Weekly Team Standup',
  'Subscription Expiring Soon',
  'Top 10 JavaScript Frameworks in 2024',
  'URGENT: Update Emergency Contact Info',
  'Monthly Statement Available',
  'Tech Conference Reminder',
  '5 New Social Notifications',
  'Package Delivered Successfully',
  'Security Alert: New Login Detected',
  'Project Milestone Completed',
  '50% OFF Sale - Limited Time!',
  'Client Call Reminder',
  'Invoice #INV-2024-001 Due',
  'Welcome to Our Newsletter',
  'Meeting Notes from Yesterday',
  'Your Order Has Shipped',
  'Password Reset Request',
  'New Feature Released',
  'Holiday Schedule Update',
  'Quarterly Report Ready',
];

const sampleBodies = [
  'Please join us for our weekly standup meeting tomorrow at 10 AM. We\'ll be discussing project progress and upcoming deadlines.',
  'Your premium subscription will expire in 3 days. Renew now to continue enjoying all premium features without interruption.',
  'Discover the most popular JavaScript frameworks that are shaping web development this year. From React to Vue.js, we cover them all.',
  'Please update your emergency contact information in the HR portal by end of week. This is required for all employees.',
  'Your monthly bank statement for December 2023 is now available for download in your online banking portal.',
  'Don\'t forget about the developer conference tomorrow. Your ticket and schedule are attached. Looking forward to seeing you there!',
  'Check out what\'s happening on your social network. You have new likes, comments, and friend requests waiting for you.',
  'Your package #ABC123 has been delivered to your address. Thank you for choosing our shipping service.',
  'We detected a login to your account from a new device. If this wasn\'t you, please change your password immediately.',
  'Congratulations! The development team has successfully completed the Q4 milestone. Great work everyone!',
  'Don\'t miss out on our biggest sale of the year! Get 50% off on all items. Sale ends this weekend.',
  'This is a reminder that you have a client call scheduled in 1 hour. The meeting link and agenda are included.',
  'Your invoice is due in 5 days. Please process payment to avoid any late fees.',
  'Welcome to our weekly newsletter! Here are the top stories from this week.',
  'Here are the notes from yesterday\'s team meeting. Please review and add any missing items.',
  'Great news! Your order has been shipped and should arrive within 2-3 business days.',
  'Someone requested a password reset for your account. If this wasn\'t you, please ignore this email.',
  'We\'ve just released a new feature that we think you\'ll love. Check it out in your dashboard.',
  'Please note the updated holiday schedule for the upcoming season.',
  'The quarterly business report is ready for review. Please check the attached documents.',
];

const sampleFromEmails = [
  'john.doe@company.com',
  'support@service.com',
  'newsletter@techblog.com',
  'hr@mycompany.com',
  'noreply@bank.com',
  'events@conference.com',
  'social@platform.com',
  'delivery@shipping.com',
  'security@email.com',
  'admin@project.com',
  'marketing@store.com',
  'calendar@app.com',
  'billing@company.com',
  'news@newsletter.com',
  'team@workspace.com',
  'orders@ecommerce.com',
  'auth@security.com',
  'product@startup.com',
  'office@headquarters.com',
  'reports@analytics.com',
];

const sampleToEmails = [
  'user@gmail.com',
  'john.smith@gmail.com',
  'jane.doe@gmail.com',
  'test.user@gmail.com',
  'demo@gmail.com',
];

const priorities = [Priority.LOW, Priority.NORMAL, Priority.HIGH, Priority.URGENT];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomBoolean(probability = 0.5): boolean {
  return Math.random() < probability;
}

function getRandomDate(daysBack: number): Date {
  const now = Date.now();
  const randomTime = Math.random() * daysBack * 24 * 60 * 60 * 1000;
  return new Date(now - randomTime);
}

async function main() {
  console.log('Clearing existing emails...');
  await prisma.email.deleteMany();

  console.log('Seeding 1000 emails...');

  const emails = [];
  
  for (let i = 0; i < 1000; i++) {
    const isDeleted = getRandomBoolean(0.1); // 10% chance of being deleted
    
    const email = {
      from: getRandomItem(sampleFromEmails),
      to: getRandomItem(sampleToEmails),
      subject: getRandomItem(sampleSubjects),
      body: getRandomItem(sampleBodies),
      isRead: getRandomBoolean(0.6), // 60% chance of being read
      isStarred: getRandomBoolean(0.2), // 20% chance of being starred
      priority: getRandomItem(priorities),
      createdAt: getRandomDate(30), // Random date within last 30 days
      deletedAt: isDeleted ? getRandomDate(7) : null, // If deleted, within last 7 days
    };
    
    emails.push(email);
  }

  // Batch insert for better performance
  for (let i = 0; i < emails.length; i += 100) {
    const batch = emails.slice(i, i + 100);
    await prisma.email.createMany({
      data: batch,
    });
    console.log(`Inserted ${Math.min(i + 100, emails.length)} / ${emails.length} emails...`);
  }

  console.log('Seeding completed!');
  
  // Show some stats
  const totalEmails = await prisma.email.count();
  const readEmails = await prisma.email.count({ where: { isRead: true } });
  const starredEmails = await prisma.email.count({ where: { isStarred: true } });
  const deletedEmails = await prisma.email.count({ where: { deletedAt: { not: null } } });
  
  console.log('\n📊 Database Stats:');
  console.log(`Total emails: ${totalEmails}`);
  console.log(`Read emails: ${readEmails}`);
  console.log(`Starred emails: ${starredEmails}`);
  console.log(`Deleted emails: ${deletedEmails}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });