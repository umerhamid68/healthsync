import styles from "./HabitItem.module.css";
import Link from "next/link";
export default function HabitItem({ id, name, frequency, streakCount, category }) {
  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <h3>
          <Link href={`/habits/${id}`}>{name}</Link>
        </h3>
        <p>Frequency: {frequency}</p>
        <p>Streak Count: {streakCount}</p>
        <p>Category: {category}</p>
      </div>
    </li>
  );
}
