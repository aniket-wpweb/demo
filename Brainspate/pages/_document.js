import Document, { Html, Head, Main, NextScript } from 'next/document';
import MyDocument from '../document.js';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return <MyDocument {...this.props} />;
  }
}

export default CustomDocument;