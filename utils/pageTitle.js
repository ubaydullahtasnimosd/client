import { useEffect } from "react";

const PageTitle = ({ title, description }) => {
  useEffect(() => {
    const brandName = "উবায়দুল্লাহ তাসনিম";
    document.title = title === brandName ? brandName : `${title} | ${brandName}`;

    if (description) {
      let metaDescription = document.querySelector("meta[name='description']");

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }

      metaDescription.content = description;
    }
  }, [title, description]);

  return null;
};

export default PageTitle;
