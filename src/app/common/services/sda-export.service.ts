import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ILookupData, ISdaListView, IBaseLookUp } from '@app/common/models';
import { Observable } from 'rxjs/Observable';
import { SdaService } from '@app/common/services/sda.service';
import * as constants from '@app/common/constants';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { AppStateService } from '@app/common/services/app-state.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//https://github.com/bpampuch/pdfmake/issues/948#issuecomment-293542550
//https://github.com/bpampuch/pdfmake/issues/948
//http://dataurl.net/#dataurlmaker
/*tslint:disable:max-line-length*/
pdfMake.vfs['Fontello.ttf'] = constants.FontelloTTF;

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  },
  Fontello: {
    normal: 'Fontello.ttf',
    bold: 'Fontello.ttf',
    italics: 'Fontello.ttf',
    bolditalics: 'Fontello.ttf'
  }
}
@Injectable()
export class SdaExportService {
  pdf: any;
  icon_check_empty = '';
  icon_circle_empty = '';
  icon_ok_squared = '';
  icon_dot_circled = '';
  new_line = '\n';
  constructor(private sdaService: SdaService) {
    this.pdf = pdfMake;
  }
  exportSda(sdas: number[]): void {
    const dd = {
      info: {
        title: 'Structural Defect Alert',
        author: 'American Airlines',
        subject: 'SDA',
        keywords: 'SDA, HSDA, Defect'
      },
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [20, 100, 20, 60],
      pageSize: 'LETTER',

      header: {
        margin: 25,
        columns: [
          {

            table: {
              widths: ['50%', '50%'],

              body: [
                [
                  {
                    margin: [-600, 0, 0, 0],
                    alignment: 'left',
                    image: constants.AALogo,
                  },
                  //{ text: 'American Airlines', alignment: 'left', style: 'header' },

                  { text: 'Structural Defect Alert', alignment: 'right', style: 'header' }
                ],
                [

                  {
                    colSpan: 2,
                    text: 'For reporting criteria, procedures, and responsibilities, see GPM section detailing Major Repair Reporting',
                    style: 'subheader',
                    alignment: 'center'
                  },

                ]
              ]
            },
            layout: 'noBorders'
          }



        ]



      },
      footer: function (currentPage, pageCount) {
        ///  return  currentPage.toString() + ' of ' + pageCount;
        return {
          margin: 8,
          columns: [
            {
              table: {
                widths: ['15%', '55%', '30%'],

                body: [
                  [
                    `Page ${currentPage} of ${pageCount}`,

                    { fontSize: 9, text: 'Enter form information into WebSceptre and co-mail entire form to 3900 N.Mingo Road / Mail\nDrop 127. In the event of WebSceptre system outage, fax form to Reliability (918) 292-2082 \nor scan and email to reliabilitysdrgroup@aa.com', alignment: 'center' },
                    { text: 'ME-0308 (00-0703-3-0107)\nR3 10/15', alignment: 'right' }
                  ]
                ]
              },
              layout: 'noBorders'
            }
          ]
        };
      },
      content: [],
      styles: {
        header: {
          fontSize: 20,
          bold: true,

        },
        subheader: {
          fontSize: 8,
          bold: true,

        },
        sectionHeader: {
          fontSize: 10,
          bold: true,
          color: '#ffffff',
          background: '#000000',
          fillColor: '#000000'
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        },
        icon: { font: 'Fontello' }
      }
    };
    // sdas = [113234, 112234];
    const final = Observable.combineLatest(sdas.map((sdaId, idx) => this.getSdaPdf(sdaId, idx)));
    final.subscribe(result => {
      dd.content = [result];
      this.pdf.createPdf(dd).download(sdas.length === 1 ? `${sdas[0]}.pdf` : 'sda.pdf');
    }, err => {
      console.log(err);
    })
    //Single
    //  this.getSdaPdf(sdas[0]).subscribe(result => {
    //    dd.content = [result];
    //    this.pdf.createPdf(dd).download(`${sdas[0]}.pdf`);
    //  });
  }

  getSdaPdf(sdaId: number, idx: number): Observable<any> {
    return this.sdaService.exportSda(sdaId).map(sda => {
      return [
        idx > 0 ? {
          text: '', pageBreak: 'before'
        } : {},
        {

          table: {
            widths: ['33%', '33%', '*'], heights: 40,
            body: [
              [
                { text: `SDR Number${this.new_line}${this.new_line}${sda.sdrNumber || ''}`, alignment: 'center' },
                { text: `ATA Code${this.new_line}${this.new_line}${sda.ataCode1}-${sda.ataCode1Desc} ${sda.ataCode2 % 100}-${sda.ataCode2Desc}`, alignment: 'center' },
                { text: `Alert Code${this.new_line}${this.new_line}${sda.alertCodeDesc}`, alignment: 'center' }
              ],

            ]
          }
        },
        this.new_line,
        this.getGeneralSection(sda),
        this.new_line,
        this.getDefectLocationSection(sda),
        this.new_line,
        this.getCPCPSection(sda),
        this.new_line,
        this.getCorrectiveActionSection(sda),
        this.new_line,
        this.getCPCPDispositionSection(sda),
        this.new_line,
        this.getDTESection(sda)
      ]
    })
  }

  getGeneralSection(sda: ISdaListView) {
    return {
      //layout: 'lightHorizontalLines',
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{ text: 'General Section', style: 'sectionHeader', colSpan: 4, margin: [2, 2, 2, 2] }, {}, {}, {}],
          [
            { text: 'SDA ID' }, { text: sda.id },
            { text: 'Line Maintenance' }, { text: sda.lineMaintenance ? this.icon_ok_squared : this.icon_check_empty, style: 'icon', alignment: 'center' },
          ],
          [
            { text: 'Create Date' }, { text: moment(sda.createDate).format('MM/DD/YYYY') },
            { text: 'Station' }, { text: sda.station },
          ],
          [
            { text: 'Department' }, { text: sda.departmentDesc },
            {
              text: ['Defect Discovered during', this.new_line,
                { text: sda.defectDiscoveredDuring === 'U' ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Unscheduled Maintenance', fontSize: 8 },
                ' ',
                { text: sda.defectDiscoveredDuring === 'S' ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Scheduled Maintenance  ', fontSize: 8 }
              ], colSpan: 2
            }
          ],
          [
            { text: 'Aircraft #' }, { text: sda.aircraftNo }, {
              text: sda.defectDiscoveredDuring === 'S' ? 'Check Type' : 'Description'
            }, {
              text: sda.defectDiscoveredDuring === 'S' ? sda.checkTypeDesc || '' : sda.unscheduledMaintenanceDescription || ''
            }
          ],
          [
            { text: 'Aircraft Manufacturer:' }, { text: sda.manufacturer }, {
              text: sda.defectDiscoveredDuring === 'S' ? 'ESM Reference #' : ''
            }, {
              text: sda.defectDiscoveredDuring === 'S' ? sda.esmReference || '' : ''
            }
          ],
          [
            { text: 'Aircraft Model/Series:' }, { text: sda.model }, {
              text: sda.defectDiscoveredDuring === 'S' ? ['Generated By Document:', this.new_line, 'Routine #'] : ['Non-Routine #']
            }, {
              text: sda.defectDiscoveredDuring === 'S' ? sda.routineNo || '' : sda.nonRoutineNo || ''
            }
          ],
          [
            { text: 'Serial #:' }, { text: sda.serialNo }, {
              text: sda.defectDiscoveredDuring === 'S' ? 'Non-Routine #' : 'MIC #'
            }, {
              text: sda.defectDiscoveredDuring === 'S' ? sda.nonRoutineNo || '' : sda.micNo || ''
            }
          ],
          [
            { text: 'Total Ship Time:' }, { text: sda.totalShipTime }, {}, {}
          ],
          [{ text: 'Cycles:' }, { text: sda.cycles }, {}, {}],
          [
            { text: 'Fleet:' }, { text: sda.fleet }, {}, {}
          ]
          ,
          [
            { text: 'Originator:' }, { text: sda.originator }, {}, {}
          ]

        ]
      }

    };
  }

  getDefectLocationSection(sda: ISdaListView) {
    return {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'Description and Location of Defects or Damage',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            { text: 'Damage Type' }, { text: sda.damageTypeDesc },
            { text: 'Defect Size(in inches)', colSpan: 2 }
          ],
          [{ text: 'Damage Description', rowSpan: 3 },
          { text: sda.damageDescription, rowSpan: 3 },
          { text: 'Length' }, { text: sda.length }],
          ['', '', { text: 'Width' }, { text: sda.width }],
          ['', '', { text: 'Depth' }, { text: sda.depth }],
          [
            {
              text: ['Precise Location of Defect:', this.new_line, { text: '(Enter From/To if Applicable)', fontSize: 8 }],
              colSpan: 4
            }, '', '', ''
          ],
          [
            {
              text: ['Aircraft Station:', this.new_line, { text: sda.aircraftStation, fontSize: 8 }]
            },
            { text: ['Stringer:', this.new_line, { text: sda.stringer, fontSize: 8 }] },
            { text: ['WL:', this.new_line, { text: sda.waterLine, fontSize: 8 }] },
            { text: ['BL:', this.new_line, { text: sda.buttLine, fontSize: 8 }] }
          ],
          [
            { text: 'MFG Part #:' }, { text: sda.manufacturerPartNo || '' },
            { text: 'Part Defective:' }, { text: sda.partDefective || '' }
          ],
          [
            {
              colSpan: 4,
              layout: 'noBorders',
              table: {
                headerRows: 0,
                margin: [0, 0, 0, 0],
                widths: ['16%', '17%', '16%', '17%', '16%', '18%'],
                body: [
                  [
                    { text: 'MFG Serial #:' }, { text: sda.manufacturerSerialNo || '' },
                    { text: 'Part TT:' }, { text: sda.partTT || '' },
                    { text: 'Part TSO:' }, { text: sda.partTSO || '' },
                  ]
                ]
              }
            }, '', '', ''
          ],
          [
            { text: 'How Detected:' },
            {
              text: [sda.detectionMethodDesc,
              {
                text: sda.detectionMethodDesc === 'Other' ? `(${sda.detectionMethodOtherDescription})` : ''
              }
              ], colSpan: 3
            },
            {}, ''
          ],
        ]
      }
    };
  }
  getCPCPSection(sda: ISdaListView) {

    return {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'Corrosion Prevention Control Program',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            { text: 'Is this a CPCP related event?' },
            {
              text: this.getBooleanContent(sda.isCPCPRelatedEvent), colSpan: 3
            },
            '', ''
          ],
          [
            { text: 'Widespread Corrosion?' },
            {
              text: this.getBooleanContent(sda.isWideSpreadCorrosion)
            },
            { text: 'Corrosion Level' },
            {
              text: [
                { text: sda.corrosionLevel === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 1' },
                ' ',
                { text: sda.corrosionLevel === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 2' },
                ' ',
                { text: sda.corrosionLevel === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 3' },
                ' ',
              ]
            },
          ],
          [
            { text: 'Corroded Area Previously Blended?' },
            {
              text: this.getBooleanContent(sda.isPreviouslyBlended)
            },
            { text: 'Corrosion Task #' },
            {
              text: sda.corrosionTaskNo || ''
            },
          ],
          [
            { text: 'Type of Corrosion' },
            {
              text: [
                sda.corrosionTypeDesc || '',
                { text: sda.corrosionTypeDesc === 'Other' ? `(${sda.corrosionTypeOtherText})` : '' }

              ],
              colSpan: 3
            }, '', ''
          ],
          [
            {
              layout: 'noBorders',
              table: {
                headerRows: 1,
                margin: [0, 0, 0, 0],
                widths: ['33%', '33%', '34%'],
                body: [
                  [
                    { text: 'Cause of Damage:', colSpan: 3 }, '', ''
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(1, 'Environment', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(2, 'Lav/Galley Spill', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(4, 'Blocked Drain', sda.causesOfDamage)
                    }
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(8, 'Chemical Spill', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(16, 'Wet Insulation Blanket', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(32, 'Missing/Deteriorated Floorboard Tape', sda.causesOfDamage)
                    }
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(64, 'Correct Harware Not Installed', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(128, 'Deteriorated/Poor Sealing Practices', sda.causesOfDamage)
                    },
                    {
                      text: this.getCauseOfDamageContent(256, 'Missing Corrosion Inhibitor', sda.causesOfDamage)
                    }
                  ],
                  [
                    {
                      text: this.getCauseOfDamageContent(512, 'Other', sda.causesOfDamage)
                    },
                    {
                      text: sda.causeOfDamageOtherText || '',
                      colSpan: 2
                    }, {}
                  ]
                ]
              }, colSpan: 4
            }, '', '', ''
          ],
          [
            { text: 'Floorboard condition after mat is removed:' },
            {
              text: sda.floorBoardConditionDesc || '', colSpan: 3
            }, '', ''
          ],
        ]
      }
    };
  }

  getCorrectiveActionSection(sda: ISdaListView) {
    const content = {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'Corrective Action',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}
          ],
          [
            { text: 'Deferred' },
            {
              text: this.getBooleanContent(sda.isDeferred),
              colSpan: 3
            }, '', ''
          ],
          [
            { text: 'SCEPTRE Deferral Code' },
            {
              text: sda.deferralCode || ''
            },
            { text: 'Deferral #' },
            {
              text: sda.deferralNo || ''
            }
          ],
          [
            {
              text: [
                { text: sda.repairType === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Defective Part Replaced With Identical Part #' },
                ' ',
                { text: sda.repairType === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Modified Part # Installed' },
                ' ',
                { text: sda.repairType === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Repaired (Describe)' },
              ], colSpan: 4
            }, '', '', ''
          ]
        ]
      }
    };
    if (sda.repairType === 1) {
      content.table.body.push([
        { text: 'Description' },
        {
          text: sda.defectivePartDescription || '',
          colSpan: 3
        },
      ]);
    }

    if (sda.repairType === 2) {
      content.table.body.push([
        { text: 'Description' },
        {
          text: sda.modifiedPartDescription || '',
          colSpan: 3
        },
      ]);
    }

    if (sda.repairType === 3) {
      content.table.body.push([
        { text: 'Description' },
        {
          text: sda.repairDescriptionTypeDesc || '',
          colSpan: 3
        },
      ]);
      content.table.body.push([
        { text: 'Repair Document:' },
        {
          text: sda.repairDocumentTypeDesc || '',
        },
        { text: 'Chap/Fig/Repair:' },
        {
          text: sda.chapFigRepairText || '',
        }
      ]);
      content.table.body.push([
        { text: 'Engineering Authorization (EA):' },
        {
          text: sda.engineeringAuthorization || '',
        },
        { text: 'Externally Visible?' },
        {
          text: this.getBooleanContent(sda.isExternallyVisible)
        }
      ]);
      content.table.body.push([
        { text: 'Approximate External Doubler Repair Dimensions', colSpan: 4 }, {}, {}, {}
      ]);
      content.table.body.push([
        { text: 'Height(in inches):' },
        {
          text: sda.repairHeight || '',
        },
        { text: 'Width(in inches):' },
        {
          text: sda.repairWidth || '',
        }
      ]);
    }
    content.table.body.push([
      { text: 'Major Repair:' },
      {
        text: this.getBooleanContent(sda.isMajorRepair),
        colSpan: 3
      }, '', ''
    ]);
    content.table.body.push([
      { text: 'Description' },
      {
        text: sda.majorRepairDescription || '', colSpan: 3
      }, {}, {}
    ]);

    return content;
  }
  getCPCPDispositionSection(sda: ISdaListView) {
    const content = {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'CPCP Disposition',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            {
              text: [
                { text: sda.isNonCPCPRelatedEvent === true ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' },
                ' ',
                { text: 'Non-CPCP' },
              ], colSpan: 4
            }, '', '', ''
          ],
          [
            {
              text: 'Is CPCP Task # correct?'
            },
            {
              text: this.getBooleanContent(sda.isCorrosionTaskNoCorrect)
            },
            {
              text: 'Corrected CPCP Task #:'
            },
            {
              text: sda.correctedCorrosionTaskNo || ''
            }
          ],
          [
            {
              text: 'Is Corrosion Level correct?'
            },
            {
              text: this.getBooleanContent(sda.isCorrosionLevelCorrect)
            },
            {
              text: ['Corrected Corrosion Level:', this.new_line,
                {
                  text: [
                    { text: sda.correctedCorrosionLevel === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                    { text: ' 1' },
                    ' ',
                    { text: sda.correctedCorrosionLevel === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                    { text: ' 2' },
                    ' ',
                    { text: sda.correctedCorrosionLevel === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                    { text: ' 3' },
                    ' ',
                  ]
                }, this.new_line,
                {
                  fontSize: 16,
                  color: '#ff0000',
                  text: 'See GPM 09.09 for corrosion level determinations'
                }

              ],
              rowSpan: 1
            }
            ,
            {
              fontSize: 8,
              text: [
                'Reason for level change:', this.new_line,
                { text: sda.corrosionLevelChangeReason === 1 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Incorrect per Corrosion Level Block Diagram' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 2 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Evidence of a previous blend has been determined' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 3 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' New limits have been defined' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 4 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Pre-blended measurements indicate Level - 1; elected to replace part for company convenience' }, this.new_line,
                { text: sda.corrosionLevelChangeReason === 5 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' Other' }, sda.corrosionLevelChangeReasonOtherText ? `(${sda.corrosionLevelChangeReasonOtherText})` : '', this.new_line,
              ], rowSpan: 1
            }
          ],
          [
            {
              text: 'Widespread Corrosion?'
            },
            {
              text: this.getBooleanContent(sda.isCPCPDWideSpreadCorrosion), colSpan: 3
            }, '', ''
          ],
          [
            'Engineering Comments', sda.engineeringComments || '',
            'QC Feedback', sda.qcFeedback || ''
          ],
          [
            {
              colSpan: 4,
              text: [
                { text: sda.submittedToQC ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, ' Submit to QC'
              ]
            }, '', '', ''
          ],
          [
            {
              text: [
                { text: sda.isReviewComplete === true ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, ' Review Complete'
              ]
            },
            {
              text: sda.reviewer || '', colSpan: 3
            }, '', ''
          ]
        ]
      }
    };

    return content;
  }
  getDTESection(sda: ISdaListView) {
    const content = {
      table: {
        fontSize: 8,
        widths: ['25%', '25%', '25%', '25%'],
        headerRows: 1,
        body: [
          [{
            text: 'Damage Tolerance Evaluation',
            style: 'sectionHeader',
            colSpan: 4,
            margin: [2, 2, 2, 2]
          }, {}, {}, {}],
          [
            { text: 'DTE Status:' }, { colSpan: 3, text: sda.dteStatusDesc || '' }, '', ''
          ],
          [
            { text: 'Total Ship Time:' }, { text: sda.dteTotalShipTime || '', colSpan: 3 }, '', ''
          ],
          [
            { text: 'Cycles:' }, { text: sda.dteCycles || '', colSpan: 3 }, '', ''
          ],
          [
            { text: 'Repair Insp. Status:' }, { text: sda.repairInspectionStatusDesc || '', colSpan: 3 }, '', ''
          ],
          [
            { text: 'Fatigue Critical?' }, {
              text: this.getBooleanContent(sda.isFatigueCritical), colSpan: 3
            }, {}, {}
          ],
          [
            { text: 'Stage 1/RTS Date:' }, { text: sda.stage1RTSDate ? moment(sda.stage1RTSDate).format('MM/DD/YYYY') : '', colSpan: 3 }, {}, {}
          ],
          [
            {
              text: [
                { text: sda.stage1Duration === 6 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 6 Months' }]
            },
            {
              text: [
                { text: sda.stage1Duration === 12 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 12 Months' }]
            },
            {
              text: [
                { text: sda.stage1Duration === 18 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 18 Months' }]
            },
            {
              text: [
                { text: sda.stage1Duration === 24 ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
                { text: ' 24 Months' }]
            }
          ],
          [
            { text: 'Stage 2 Approval Date:' }, { text: sda.stage2Date ? moment(sda.stage2Date).format('MM/DD/YYYY') : '' },
            { text: 'Stage 3 Approval Date:' }, { text: sda.stage3Date ? moment(sda.stage3Date).format('MM/DD/YYYY') : '' }
          ],
          [
            { text: 'SR #' }, { text: sda.srNumber || '' },
            { text: 'RDAS #:' }, { text: sda.rdasNumber || '' },
          ],
          [
            { text: 'ETD #:' }, { text: sda.etdNumber || '' },
            { text: 'ESM Sub/Item #:' }, { text: sda.esmSubItemNumber || '' },
          ],
          [
            this.getDTEThresholdsConent(sda)
          ],
          [
            this.getDTEMonitorItemsConent(sda)
          ],
          [
            { text: 'DTE Comments:' }, { text: sda.dteComments || '' },
            {
              text: [
                'QC Feedback:'
                , this.new_line,
                , this.new_line,
                , this.new_line,
                { text: sda.dteSubmittedToQC === true ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' },
                ' ',
                { text: 'Submit to QC' },
              ]
            }, { text: sda.dteqcFeedback || '' },
          ],
          [
            {
              colSpan: 4,
              layout: 'noBorders',
              table: {
                headerRows: 0,
                margin: [0, 0, 0, 0],
                widths: ['16%', '17%', '16%', '17%', '16%', '18%'],
                body: [
                  [
                    { text: 'Major Repair Updated By:' }, { text: sda.dteUpdatedBy || '' },
                    { text: 'Major Repair Updated Date:' }, { text: sda.dteUpdatedDate ? moment(sda.dteUpdatedDate).format('MM/DD/YYYY hh:mm A') : '' },
                    { text: 'DTE Due Date:' }, { text: sda.dueDate || '' },
                  ]
                ]
              }
            }, '', '', ''
          ]
        ]
      }
    };

    return content;
  }

  getDTEThresholdsConent(sda: ISdaListView) {
    const content = {
      colSpan: 4,
      table: {
        fontSize: 8,
        widths: ['10%', '30%', '30%', '30%'],
        headerRows: 2,
        body: [
          [
            { text: 'DTE Thresholds', colSpan: 4 }, '', '', ''
          ],
          [
            '', 'Inspection Threshold', 'Inspection Interval', 'Inspection Method'
          ],
          ['1', sda.dteInspectionThreshold1 || '', sda.dteInspectionInterval1 || '', sda.dteInspectionMethod1 || ''],
          ['2', sda.dteInspectionThreshold2 || '', sda.dteInspectionInterval2 || '', sda.dteInspectionMethod2 || ''],
          ['3', sda.dteInspectionThreshold3 || '', sda.dteInspectionInterval3 || '', sda.dteInspectionMethod3 || ''],
          ['4', sda.dteInspectionThreshold4 || '', sda.dteInspectionInterval4 || '', sda.dteInspectionMethod4 || ''],
          ['5', sda.dteInspectionThreshold5 || '', sda.dteInspectionInterval5 || '', sda.dteInspectionMethod5 || ''],
        ]
      }
    };

    return content;

  }

  getDTEMonitorItemsConent(sda: ISdaListView) {
    const content = {
      colSpan: 4,
      table: {
        fontSize: 8,
        widths: ['10%', '90%'],
        headerRows: 2,
        body: [
          [
            { text: 'DTE Monitor Items', colSpan: 2 }, ''
          ],
          [
            '', 'FMR/Logpage/MON'
          ],
          ['1', sda.dteMonitorItem1 || ''],
          ['2', sda.dteMonitorItem2 || ''],
          ['3', sda.dteMonitorItem3 || ''],
          ['4', sda.dteMonitorItem4 || ''],
          ['5', sda.dteMonitorItem5 || ''],
        ]
      }
    };

    return content;
  }

  getCauseOfDamageContent(val: number, text: string, currentVal: number): Array<any> {
    const content = [
      // tslint:disable-next-line:no-bitwise
      { text: ((currentVal & val) === val) ? this.icon_ok_squared : this.icon_check_empty, style: 'icon' }, ' ', { text: text },
    ]

    return content;
  }

  getBooleanContent(val: boolean) {
    return [
      { text: val === true ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
      { text: ' Yes' },
      ' ',
      { text: val === false ? this.icon_dot_circled : this.icon_circle_empty, style: 'icon' },
      { text: ' No' }
    ]
  }
}
