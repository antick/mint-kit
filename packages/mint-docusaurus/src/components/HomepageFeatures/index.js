import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Modular Architecture',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        All the apps in the Mint stack follows a modular architecture with best coding standards and practices.
        This makes sure that your app is robust on all fronts.
      </>
    ),
  },
  {
    title: 'Multiple Tech Stacks',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Currently, Mint Stack is available for MERN Stack. But we are working to get other backend and
        frontend stacks along with these two.
      </>
    ),
  },
  {
    title: 'Built-in Authentication',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Mint Stack provides the authentication and authorization out-of-the-box so you can save your time by only
        focusing on the real work.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
