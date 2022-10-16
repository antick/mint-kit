import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Modular Architecture',
    image: 'img/modular-architecture.svg',
    description: (
      <>
        All the apps in the Mint stack follows a modular architecture with best coding standards and practices.
        This makes sure that your app is robust on all fronts.
      </>
    ),
  },
  {
    title: 'Multiple Tech Stacks',
    image: 'img/undraw_create_f05x.svg',
    description: (
      <>
        Currently, Mint Stack is available for MERN Stack. But we are working to get other backend and
        frontend stacks along with these two.
      </>
    ),
  },
  {
    title: 'Built-in Authentication',
    image: 'img/built-in-auth.svg',
    description: (
      <>
        Mint Stack provides the authentication and authorization out-of-the-box so you can save your time by only
        focusing on the real work.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
