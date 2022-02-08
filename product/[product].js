import styles from './product.module.css';
import { connect } from 'react-redux';
import ProductPageImageCarousel from '../../components/ProductPageImageCarousel/ProductPageImageCarousel';
import ProductPageItemInfo from '../../components/ProductPageItemInfo/ProductPageItemInfo';
import { recursiveCatalog, getProduct } from '../../shopify';
import wrapper from '../../store';
import { useEffect, useMemo } from 'react';

function ProductPage(props) {
  useEffect(() => {
    document.body.firstChild.firstChild.scrollTo(0,0);
  }, []);

  function filterDataSizesPerColor(variants) {
    let sizesByColor = {};
    variants.map(variant1 => {
      variants.forEach(variant2 => {
        if(variant1.node.selectedOptions[0].value===variant2.node.selectedOptions[0].value) {
          let color = variant1.node.selectedOptions[0].value;
          if(!sizesByColor.hasOwnProperty(color)) {
            sizesByColor[color] = {};
          }
          let size = variant2.node.selectedOptions[1].value;
          if(variant1.node.selectedOptions[0].value===variant2.node.selectedOptions[0].value && !sizesByColor[color][size]){
            sizesByColor[color][size] = variant2;
          }
        }
      })
    });
    return sizesByColor;
  }
  let sizesByColor = useMemo(() => filterDataSizesPerColor(props.product.product.data.productByHandle.variants.edges));  

  return (
    <div className={styles.productPageContainer}>
      <ProductPageImageCarousel variants={sizesByColor}selectVariant={props.selectVariant} />
      <ProductPageItemInfo variants={sizesByColor} selectVariant={props.selectVariant} />
    </div>
  );
}

function stateToProps(state) {
  return {
    product: state.products.pdp
  }
}

function selectVariant(dispatch, product) {
  dispatch({ type: 'PDP_SELECTED_VARIANT', payload: product})
}
function dispatchToProps(dispatch) {
  return {
    selectVariant: (product) => selectVariant(dispatch, product)
  }
}
export default connect(stateToProps, dispatchToProps)(ProductPage);




export const getStaticProps = wrapper.getStaticProps((store) => async ({ params }) => {
  const product = await getProduct(params.product);
  let firstVariant = product.data.productByHandle.variants.edges[0].node.selectedOptions;
  let firstVariantValues = {
    color: firstVariant[0].value,
    size: firstVariant[1].value,
    colorIndex: 0
  }
  store.dispatch({ type: 'PDP_PRODUCT', payload: product });
  store.dispatch({ type: 'PDP_SELECTED_VARIANT', payload: firstVariantValues})
})

export async function getStaticPaths() {
  const products = await recursiveCatalog();
  const paths = products.map(item => {
    const product = String(item.node.handle)
    return {
      params: { product }
    }
  })
  return {
    paths,
    fallback: false
  }
}