import EmailList from './EmailList';

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto mt-10">
      <h1 className='text-2xl font-bold mb-4'>Inbox</h1>
      <EmailList />
    </main>
  );
}
