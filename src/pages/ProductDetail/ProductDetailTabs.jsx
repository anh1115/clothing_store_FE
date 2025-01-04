import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormReview from './FormReview';
import ListReview from './ListReview';

function ProductDetailTabs({ description, product_id }) {
  const [refreshList, setRefreshList] = useState(false);
  const formattedDescription = description.replace(/\r\n/g, '<br />');

  const handleReviewSubmit = () => {
    setRefreshList(!refreshList); // Toggle state để tái gọi API trong ListReview
  };

  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Mô tả sản phẩm">
        <div dangerouslySetInnerHTML={{ __html: formattedDescription }} />
      </Tab>
      <Tab eventKey="reviews" title="Đánh giá sản phẩm">
        {/* <FormReview product_id={product_id} onReviewSubmit={handleReviewSubmit} /> */}
        <ListReview key={refreshList} product_id={product_id} />
      </Tab>
    </Tabs>
  );
}

export default ProductDetailTabs;