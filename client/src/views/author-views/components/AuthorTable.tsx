import React, { useState, useEffect } from 'react';
import { Skeleton } from "@material-ui/lab";

import { getAuthors } from "../../../apis/authors/authors.api";
import {BasicTable} from "../../../components";

function AuthorTable(){
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await getAuthors();

      console.log(`result`, result)
      if (result.errorCode) {
        console.log(result.message)
      } else {
        setAuthors(result);
      }
    };

    fetchData();
  }, []);

  return authors?.length ?
    <BasicTable
      title="Authors"
      tableHeadings={Object.keys(authors[0])}
      tableData={authors.map((author) => Object.values(author))}
    /> :
    <Skeleton variant="rect" height={400} />;
}

export default AuthorTable;