import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function TopCategories({ categories }) {
  return (
    <section className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 md:text-3xl lg:text-4xl text-center">Top Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link href={category.link} key={index} className="bg-white rounded-lg shadow-md overflow-hidden group" prefetch={false}>
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary">{category.title}</h3>
                <p className="text-muted-foreground group-hover:text-black">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

TopCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

