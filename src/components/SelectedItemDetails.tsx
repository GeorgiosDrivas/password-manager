export default function SelectedItemDetails({ item }: any) {
  return (
    <>
      <section className="my-5">
        <div>
          <ul>
            <li className="fira-sans-medium">
              Username:{" "}
              <span className="rubik-head-medium">{item.username}</span>
            </li>
            <li className="fira-sans-medium">
              Password:{" "}
              <span className="rubik-head-medium">{item.password}</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
