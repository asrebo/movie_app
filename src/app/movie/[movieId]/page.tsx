export default async function MoviePage({ params }: { params:  Promise<{ movieId: string }> }) {
  return (
    <>
      Movie ID: { (await params).movieId}
    </>
  );
}