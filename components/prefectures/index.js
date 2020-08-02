import React, { useState, useEffect } from 'react'
import { ListGroup } from "react-bootstrap"
import "./index.module.scss"


function Index({prefectures}) {
  const areas = ["北海道", "東北", "関東", "中部", "関西", "中国",  "四国", "九州"]
  return(
    <div className="area-select">
      {areas.map((area) =>
        <div key={area} className="area-select__region">
          <h3 className="area-select__region-name">{area}</h3>
          <ListGroup horizontal="sm" className="my-2">
            {prefectures.filter(prefecture => prefecture.area === area).map((prefecture) =>
              <ListGroup.Item key={prefecture.id} href={"/" + prefecture.id}>
                {prefecture.prefecture_name}
                <span className="small">({prefecture.shops_count})</span>
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      )}
    </div>
  )
}

export default Index