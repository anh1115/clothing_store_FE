import React from 'react';
import CardRecommend from '../Card/CardRecommend';
import { Card } from 'react-bootstrap'

export default function Recommended() {
  return (
    <div>
        <h2>Sản phẩm gợi ý cho bạn</h2>
        <div>
            <CardRecommend/>
        </div>
    </div>
  )
}