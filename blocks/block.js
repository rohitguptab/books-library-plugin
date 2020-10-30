const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, ToggleControl } = wp.components;
const { Fragment } = wp.element;

import { book_icon, option1, option2, option3, option4 } from './icons';

registerBlockType('book/book-library', {
  title: __('Book Library'),
  icon: book_icon,
  category: 'common',
  attributes: {
    filter: {
      type: 'boolean',
      default: true,
    },
    layout: {
      type: 'string',
      default: 'layout-1',
    },
  },
  edit(props) {
    const { filter, layout } = props.attributes;
    return (
      <div id="react-blog-app" className="books-library">
        {book_icon}
        <h2>Books Library</h2>
        <p>You can use this block to display books library to front side.</p>
        <InspectorControls key="Book Library Layout">
          <PanelBody title="Book Library" initialOpen="true">
            <PanelRow>
              <ToggleControl
                label={__('Show Filter')}
                checked={filter}
                onChange={() => {
                  props.setAttributes({
                    filter: ! filter,
                  });
                  if (filter) {
                    props.setAttributes({
                      layout: 'layout-3',
                    });
                  } else {
                    props.setAttributes({
                      layout: 'layout-1',
                    });
                  }
                }}
              />
            </PanelRow>
            <PanelRow>
              <ul class="book-layout">
                {filter ? (
                  <Fragment>
                    <li
                      className={'layout-1' === layout ? 'active' : ''}
                      onClick={() => {
                        props.setAttributes({
                          layout: 'layout-1',
                        });
                      }}
                    >
                      <lable>Layout 1</lable>
                      {option1}
                    </li>
                    <li
                      className={'layout-2' === layout ? 'active' : ''}
                      onClick={() => {
                        props.setAttributes({
                          layout: 'layout-2',
                        });
                      }}
                    >
                      <lable>Layout 2</lable>
                      {option2}
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li
                      className={'layout-3' === layout ? 'active' : ''}
                      onClick={() => {
                        props.setAttributes({
                          layout: 'layout-3',
                        });
                      }}
                    >
                      <lable>Layout 3</lable>
                      {option3}
                    </li>
                    <li
                      className={'layout-4' === layout ? 'active' : ''}
                      onClick={() => {
                        props.setAttributes({
                          layout: 'layout-4',
                        });
                      }}
                    >
                      <lable>Layout 4</lable>
                      {option4}
                    </li>
                  </Fragment>
                )}
              </ul>
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      </div>
    );
  },
  save(props) {
    const { filter, layout } = props.attributes;
    return (
      <div id="react-blog-app" data-layout={layout} data-filter={filter}></div>
    );
  },
});
