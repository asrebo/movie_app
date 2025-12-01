export default async function SearchPage({ params , searchParams }: { params:  Promise<{ search: string }>, searchParams: Promise<{ query: string }> }) {
  return (
    <>
      Search page for: { (await searchParams).query }
    </>
  );
}