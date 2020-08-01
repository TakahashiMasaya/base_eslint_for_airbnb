import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Link,
  Typography,
} from '@material-ui/core';
import { ForwardButton, ButtonBlue } from '../atoms/Button';

const StyledTableContainer = styled(TableContainer)`
  max-height: 550px;
  .MuiTableCell-stickyHeader {
    background-color: ${(props) => props.theme.palette.primary.main};
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #ddd;
    border: none;
    border-radius: 0px 3px 3px 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 3px;
    box-shadow: none;
  }

  &::-moz-scrollbar {
    width: 10px;
  }
  &::-moz-scrollbar-track {
    background: #ddd;
    border: none;
    border-radius: 0px 3px 3px 0px;
  }
  &::-moz-scrollbar-thumb {
    background: #aaa;
    border-radius: 3px;
    box-shadow: none;
  }
`;

const StyledTableSortLabel = styled(TableSortLabel)`
  &:hover, &:focus{
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;

const StyledTableCellHeader = styled(TableCell)`
  color: ${(props) => props.theme.palette.primary.contrastText};
`;

const StyledRenderRow = styled(TableRow)`
  height: 50px;
`;

const StyledCheckbox = styled(Checkbox)`
  padding: 6px;
`;

type URL = {
  type: 'url';
  href: string | ((row: any) => string);
  newWindow?: boolean;
};

type Checkbox = {
  type: 'checkbox';
  name: string | ((row: any) => string);
  disabled?: boolean | ((row: any) => boolean);
  checked?: boolean | ((row: any) => boolean);
  onChange?: (e: any) => void;
};

type ForwardButton = {
  type: 'forwardButton';
  name: string | ((row: any) => string);
  display?: boolean | ((row: any) => boolean);
  href: string | ((row: any) => string);
  onClick?: (e: any, row: any) => void;
};

type ExecuteButton = {
  type: 'executeButton';
  name?: string | ((row: any) => string);
  display?: boolean | ((row: any) => boolean);
  onClick?: (e: any, row: any) => void;
};

type SpecifiedText = {
  type: 'specifiedText';
  text: string;
};

type Button = {
  type: 'button';
  name?: string | ((row: any) => string);
  display?: boolean | ((row: any) => boolean);
  href?: string | ((row: any) => string);
  newWindow?: boolean;
};

type Text = {
  type: 'text';
  text: string;
};

type ATTRIBUTE = URL
  | Checkbox
  | ForwardButton
  | ExecuteButton
  | Button
  | SpecifiedText
  | Text
  | null
  | undefined;

type Header = {
  [key: string]: {
    content?: string | number | boolean;
    name?: string;
    attribute?: ATTRIBUTE | ((row: any) => ATTRIBUTE);
    direction?: string;
    sortAction?: (e: any) => void;
    // attribute?: {
    //   newWindow?: boolean;
    //   href?: string | ((row: any) => string | null);
    //   name?: string | ((row: any) => string);
    //   disabled?: boolean | ((row: any) => boolean);
    //   display?: boolean | ((row: any) => boolean);
    //   checked?: boolean | ((row: any) => boolean);
    //   // TODO: onChange時、チェックしたrowのデータを取得できるか検証を行う
    //   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    //   onClick?: (e: React.MouseEvent<HTMLButtonElement>, row: any) => void;
    //   direction?: string;
    //   sortAction?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    //   text?: string;
    // };
  };
};

type Row = {
  [key: string]: string | number | boolean | Array<any> | null;
};
type Props = {
  header: Header;
  rows: Row[];
  noRecordText?: string;
};

const renderUrl = (props: {
  attribute?: URL,
  row: any,
  value: string | number | boolean | Array<any> | null,
}): ReactNode => {
  const { attribute, row, value } = props;
  const hasHref = attribute?.href || false;
  const href = (attribute?.href instanceof Function)
    ? attribute?.href(row)
    : attribute?.href;
  if (hasHref && !href) {
    return <Typography variant="body2">{value}</Typography>;
  }

  const newWindow = attribute?.newWindow;
  return newWindow ? (
    <Link
      target="_blank"
      href={href || ''}
      rel="noopener"
    >
      {value}
    </Link>
  ) : (
      <Link
        to={href || ''}
        component={RouterLink}
      >
        {value}
      </Link>
    );
};

const renderCheckbox = (attribute: Checkbox, row: any, index: number): ReactNode => {
  const { name, disabled, checked, onChange } = attribute;
  return (
    <StyledCheckbox
      name={(name instanceof Function) ? name(row) : name || ''}
      onChange={onChange}
      color="default"
      inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${index}` }}
      disabled={(disabled instanceof Function) ? disabled(row) : disabled}
      checked={(checked instanceof Function) ? checked(row) : checked}
    />
  );
};

const renderForwardButton = (attribute: ForwardButton, row: any): ReactNode => {
  const hasDisplay = attribute?.display || false;
  const display = (attribute?.display instanceof Function)
    ? attribute?.display(row)
    : attribute?.display;
  if (hasDisplay && !display) {
    return null;
  }

  const href = (attribute?.href instanceof Function)
    ? attribute?.href(row)
    : attribute?.href;
  const buttonName = (attribute?.name instanceof Function)
    ? attribute?.name(row)
    : attribute?.name || '';
  return (
    <Link
      underline="none"
      component={RouterLink}
      to={href || ''}
    >
      <ForwardButton>{buttonName}</ForwardButton>
    </Link>
  );
};

const renderButton = (attribute: Button, row: any): ReactNode => {
  const hasDisplay = attribute?.display || false;
  const display = (attribute?.display instanceof Function)
    ? attribute?.display(row)
    : attribute?.display;
  if (hasDisplay && !display) {
    return null;
  }

  const href = (attribute?.href instanceof Function)
    ? attribute?.href(row)
    : attribute?.href;
  const newWindow = attribute?.newWindow;
  const name = attribute?.name;
  const buttonName = (name instanceof Function)
    ? name(row)
    : name || '';
  return newWindow ? (
    <Link
      target="_blank"
      underline="none"
      href={href || ''}
      rel="noopener"
    >
      <ButtonBlue>{buttonName}</ButtonBlue>
    </Link>
  ) : (
      <Link
        underline="none"
        component={RouterLink}
        to={href || ''}
      >
        <ButtonBlue>{buttonName}</ButtonBlue>
      </Link>
    );
};

const renderExecuteButton = (attribute: ExecuteButton, row: any): ReactNode => {
  const hasDisplay = attribute?.display || false;
  const display = (attribute?.display instanceof Function)
    ? attribute?.display(row)
    : attribute?.display;
  if (hasDisplay && !display) {
    return null;
  }

  const buttonName = (attribute?.name instanceof Function)
    ? attribute?.name(row)
    : attribute?.name || '';
  const onClick = attribute?.onClick;
  return (
    <ButtonBlue
      onClick={(onClick instanceof Function) ? (e) => onClick(e, row) : undefined}
    >
      {buttonName}
    </ButtonBlue>
  );
};

const DataTable: React.FC<Props> = (props) => {
  const { header, rows, noRecordText } = props;

  const renderHeader = (_header: Header) => (
    <StyledTableRow>
      {Object.keys(_header).map((key) => {
        let value: ReactNode | null = _header[key]?.content;
        const { direction, sortAction } = _header[key];
        value = (sortAction
          ? (
            <StyledTableSortLabel
              direction={direction as ('asc' | 'desc' | undefined)}
              onClick={
                (sortAction instanceof Function)
                  ? (e) => { sortAction(e); }
                  : undefined
              }
            >
              {value}
            </StyledTableSortLabel>
          )
          : value);
        return (<StyledTableCellHeader key={`${key}-${value}`}>{value}</StyledTableCellHeader>);
      })}
    </StyledTableRow>
  );

  const renderRows = (_rows: Row[], _header: Header) => {
    if (!_rows?.length) {
      return (
        <StyledRenderRow>
          <TableCell>{noRecordText || 'データがありません'}</TableCell>
        </StyledRenderRow>
      );
    }
    return (
      _rows.map((row, index) => (
        <StyledRenderRow key={`table-rows-${index.toString()}`}>
          {Object.keys(_header).map((headerKey: string, headerIndex: number) => {
            let attribute = _header[headerKey]?.attribute;
            attribute = (attribute instanceof Function) ? attribute(row) : attribute;
            const type = (attribute as ATTRIBUTE)?.type;
            const value = row[headerKey];
            let inner: ReactNode | null = null;

            switch (type) {
              case 'url':
                inner = renderUrl({ attribute: (attribute as URL), row, value: row[headerKey] });
                break;
              case 'checkbox':
                inner = renderCheckbox(attribute as Checkbox, row, index);
                break;
              case 'forwardButton':
                inner = renderForwardButton(attribute as ForwardButton, row);
                break;
              case 'executeButton':
                inner = renderExecuteButton(attribute as ExecuteButton, row);
                break;
              case 'button':
                inner = renderButton(attribute as Button, row);
                break;
              case 'specifiedText':
                inner = (attribute as Text)?.text || '';
                break;
              default:
                inner = value;
                break;
            }
            return (
              <TableCell key={`table-cells-${headerIndex.toString()}-${value}`}>
                {inner}
              </TableCell>
            );
          })}
        </StyledRenderRow>
      ))
    );
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table size="small" aria-label="a dense table" stickyHeader>
        <TableHead>
          {renderHeader(header)}
        </TableHead>
        <TableBody>
          {renderRows(rows, header)}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default DataTable;
