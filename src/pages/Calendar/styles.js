import styled from 'styled-components'

export const CalendarBlock = styled('div')`
  text-align: center;
  background: #f5f8fa;
  height: 100%;
  width: 100%;
  padding: ${props => props.isMobile ? '0px 0 0 0' : '40px 20px 40px 300px'};
  
  .rbc-calendar{
    position: relative;
    height: ${props => props.isMobile ? '87vh' : '900px'};
    max-width: ${props => props.isMobile ? '' : '1200px'};
    padding: ${props => props.isMobile ? '45px 5px' : '50px'};
    background: #fff;
    border-radius: 7px;
    color: #3F4254 !important;
  }
  
  .rbc-toolbar{
      justify-content: ${props => props.isMobile ? 'space-between' : ''};
  }

  .rbc-off-range-bg{
    background: none !important;
  }
  
  .rbc-header{
    font-size: 14.3px !important ;
    font-weight: 500 !important;
    color: #3F4254 !important;
    /* height: 60px; */
    /* padding-top: 8px !important; */
  }
  
  .rbc-toolbar-label{
    width: ${props => props.isMobile ? '100%' : ''};
    position: ${props => props.isMobile ? 'absolute' : ''};
    top: ${props => props.isMobile ? '7px' : ''};
    text-align: center;
    font-size: 19.5px !important;
    font-weight: 600 !important;
    color: #3F4254 !important;
  }
  
  .rbc-toolbar button {
    padding: 9.75px 16.25px !important;
    border: none !important;
    background-color: var(--fc-button-bg-color, #f5f8fa) !important;
    color: var(--fc-button-text-color, #7E8299) !important;
    font-size: 13px !important;
    -webkit-appearance: button !important;
  }
  
  .rbc-toolbar button.rbc-active{
    color: #181C32 !important;
    background: #EFF2F5 !important;
  }
  
  .rbc-toolbar button:hover{
    color: #181C32 !important;
  }
  
  .rbc-month-view, .rbc-time-view{
    border-radius: 5px !important;
    border:1px solid #EFF2F5 !important
  }
  
  .rbc-day-bg + .rbc-day-bg{
    border: 1px solid #EFF2F5 !important
  }
  
  .rbc-time-content{
    border-top: 2px solid #f5f8fa !important;
  }
  
  .rbc-date-cell > a{
    font-size: 13px;
    color: #3F4254
  }
  
  .rbc-label{
    font-size: 12.3px !important;
    text-align: right !important;
  }
  
  .rbc-event:focus{
    outline: none !important;
  }
  
  `

export const ShowEventModal = styled('div')`
    width: 100%;
    padding: ${props => props.isMobile ? '10px 0 10px 10px' : "60px 0px 60px 60px"};
  `

export const ShowEventTitleBlock = styled('div')`
    display: flex;
    margin-bottom: 20px;
  `
export const ShowEventTitle = styled('h4')`
    padding-bottom: 0px;
  `
export const RedPoint = styled('div')`
    display: inline-block;
    height: 15px;
    width: 15px;
    background-color: red;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
    top:3px;
    `
export const GreenPoint = styled('div')`
    display: inline-block;
    height: 15px;
    width: 15px;
    background-color: green;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
    top:3px;
  `
export const EditIconBlock = styled('div')`
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    fill:#808080;
    &:hover{
      fill:#029BF3;
    }
`
export const TrashIconBlock = styled('div')`
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    fill:#808080;
    &:hover{
      fill: #029BF3;
    }
`

export const TextWithBack = styled.span`
padding: 3px 5px;
border-radius: 5px;
background-color: ${props => props.backColor ? props.backColor : '#F5F8FA'};
color: ${props => props.color ? props.color : ''};
font-size: 12px;
`

  // export const InputTitle = styled('input')`
//     background: #F5F8FA;
//     width: 100%;
//     margin-right: 10px;
//     border-radius: 0.475rem;
//     padding: 0.75rem 1rem;
//     padding-right: 40px;
//     color: #5E6278;
//     font-size: ${props => props.isMobile ? '14px' : '1rem'};
//     font-weight: 500;
//     line-height: 1.5;
//     height: ${props => props.isMobile ? '40px' : '55px'};
//     outline: none;
//     border: none;
//     margin-bottom: ${props => props.isMobile ? '30px' : '50px'};
//     &:focus{
//        background-color: #EEF3F7;
//     }
// `

// export const InputDescription = styled('input')`
//     background: #F5F8FA;
//     width: 100%;
//     margin-right: 10px;
//     border-radius: 0.475rem;
//     padding: 0.75rem 1rem;
//     padding-right: 40px;
//     color: #5E6278;
//     font-size: ${props => props.isMobile ? '14px' : '1rem'};
//     font-weight: 500;
//     line-height: 1.5;
//     height: ${props => props.isMobile ? '40px' : '55px'};
//     outline: none;
//     border: none;
//     &:focus{
//        background-color: #EEF3F7;
//     }
//   `
