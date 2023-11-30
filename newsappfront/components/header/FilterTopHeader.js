import Select from "react-select";
import React from "react";
// import { useDebouncedCallback } from "use-debounce";

export default function FilterTopHeader({
 
  user,
  userName,
  selectedUser,
  handelUserSelect,
  handelUserSearch,
  toDate,
  handleSearch,
  dateRangePicker,
  filter,
  status,
  selectedStatus,
  handelStatusSelect,
  fromDate,
  clearFilter,
  statusname,
}) {
  // const debounced = useDebouncedCallback(
  //   (value) => {
  //     setSearch(value);
  //   },
  //   // delay in ms
  //   1100
  // );

  return (
    <>
      <div className='filter-box'>
        <div className='flexBox'>
          {user && (
            <div className='select-box pl--0'>
              <div className='title'>
                <p className='pr-4'>{userName}</p>
              </div>
              <div className='select-status'>
                <Select
                  value={selectedUser}
                  isSearchable={true}
                  onChange={(e) => handelUserSelect(e)}
                  onInputChange={(e) => handelUserSearch(e)}
                  options={user}
                  placeholder={userName}
                />
              </div>
            </div>
          )}
          <div className='select-box'>
            <div className='title'>
              <p className='pr-4'>From</p>
            </div>
            <div className='select-status'>
              <input
                type='date'
                name='from'
                value={fromDate}
                onChange={(e) => {    
                  dateRangePicker(e)
                }}
              />
            </div>
          </div>
          <div className='select-box'>
            <div className='title'>
              <p className='pr-4'>To</p>
            </div>
            <div className='select-status'>
              <input
                value={toDate}
                type='date'
                name='to'
                onChange={(e) => {
                  dateRangePicker(e)
                }}
              />
            </div>
          </div>
          {status && (
            <div className='select-box'>
              <div className='title'>
                <p className='pr-4'>{statusname}</p>
              </div>
              <div className='select-status'>
                <Select
                  value={selectedStatus}
                  isSearchable={true}
                  onChange={(e) => handelStatusSelect(e)}
                  options={status}
                  placeholder='Status'
                />
              </div>
            </div>
          )}
          {/* {checkedDriver.length > 0 && (
                        <div className="operations">
                          <button
                            className="creatButton label-danger"
                            onClick={deleteDriver(checkedDriver)}
                          >
                            Delete Selected
                          </button>
                        </div>
                      )} */}
          <div className='search-box'>
            <div className='seacrh-data'>
              <div className='icon'>
                <svg viewBox='0 0 32 32'>
                  <defs></defs>
                  <title />
                  <g id='Search'>
                    <path
                      class='cls-1'
                      d='M27.0215,24.6064,22.0254,19.61a9.0257,9.0257,0,1,0-1.4141,1.414l4.9961,4.9961a1,1,0,1,0,1.4141-1.4141ZM8,14a7,7,0,1,1,7,7A7.0081,7.0081,0,0,1,8,14Z'
                    />
                  </g>
                </svg>
              </div>
              <input
                onChange={(e) => handleSearch(e)}
                type='text'
                placeholder='Start typing to search'
              />
            </div>
          </div>
          <div></div>
          <div>
            {/* <div className="date-range">
                      <div>
                        <p>From</p>
                        <input
                          type="date"
                          name="from"
                          onChange={dateRangePicker}
                        />
                      </div>
                      <div>
                        <p>To</p>
                        <input
                          type="date"
                          name="to"
                          onChange={dateRangePicker}
                        />
                      </div>
                      {checkedDriver.length > 0 && (
                        <div className="operations">
                          <button
                            className="creatButton label-danger"
                            onClick={deleteDriver(checkedDriver)}
                          >
                            Delete Selected
                          </button>
                        </div>
                      )}
                    </div> */}
          </div>
          {filter && Object.keys(filter).length > 0 && (
            <div className='search-box'>
              <div className='seacrh-data btnSecondary'>
                <button type='button' className='btn' onClick={clearFilter}>
                  <svg
                    class='svg-inline--fa fa-times-circle fa-w-16 mr-1'
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fa'
                    data-icon='times-circle'
                    role='img'
                    viewBox='0 0 512 512'
                    data-fa-i2svg=''
                  >
                    <path
                      fill='currentColor'
                      d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'
                    ></path>
                  </svg>
                  <span>Clear</span>
                </button>
              </div>
            </div>
          )}
          {/* <div className='filterBtn'>
                            <button className='btn'>
                                <svg viewBox="0 0 512 512">
                                    <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z" />
                                </svg>
                                <span>Filter</span>
                            </button>
                        </div> */}
        </div>
      </div>
    </>
  );
}
