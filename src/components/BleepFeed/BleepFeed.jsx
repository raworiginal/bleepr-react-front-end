import { Link } from "react-router";


const BleepFeed = (props) => {
     return (
    <main>
      {props.bleeps.map((bleep) => (
        <Link key={bleep._id} to={`/bleeps/${bleep._id}`}>
          <article>
            <header>
              <p>{bleep.text}</p>
              <p>
                {`${bleep.author.username} posted on
                ${new Date(bleep.createdAt).toLocaleDateString()}`}
              </p>
            </header>
          </article>
        </Link>
      ))}
    </main>
  );
}

export default BleepFeed;