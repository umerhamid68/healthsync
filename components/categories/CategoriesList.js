import Link from "next/link";

function CategoriesList({ categories }) {
  return (
    <div>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category}>
            <Link href={`/categories/${category}`}>
                <h3>{category}</h3>
            </Link>
          </div>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
}

export default CategoriesList;
