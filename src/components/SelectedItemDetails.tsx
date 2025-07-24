export default function SelectedItemDetails({ item }: any) {
  return (
    <>
      <section className="my-5">
        <div>
          <ul>
            <li>Username: {item.username}</li>
            <li>Password: {item.password}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
