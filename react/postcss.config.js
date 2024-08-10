import postCssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postCssImport,
    tailwindcss,
    autoprefixer,
  ],
};
